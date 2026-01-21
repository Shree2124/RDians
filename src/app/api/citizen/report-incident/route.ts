import { Incident } from "@/types/incident.type";
import { NextApiRequest, NextApiResponse } from "next";
import { uploadImageToSupabase } from "@/helpers/uploadImage";
import { saveTempFile, deleteTempFile } from "@/helpers/uploadTemp";
import { withUser } from "@/lib/middleware/withUser";

const validateIncident = (data: Incident) => {
  const { category, description, lat, lng, severity_level } = data;

  if (!category || !description || !lat || !lng || !severity_level) {
    return { valid: false, error: "Please fill all required fields" };
  }

  const latNum = parseFloat(lat as string);
  const lngNum = parseFloat(lng as string);
  const estimatedNum = data.estimated_people_affected
    ? parseInt(data.estimated_people_affected as string)
    : null;

  if (isNaN(latNum) || isNaN(lngNum)) {
    return { valid: false, error: "Latitude and longitude must be numbers" };
  }

  return {
    valid: true,
    data: {
      ...data,
      lat: latNum,
      lng: lngNum,
      estimated_people_affected: estimatedNum,
    },
  };
};

export const POST = withUser(
  async (req: NextApiRequest & { user?: any }, res: NextApiResponse) => {
    try {
      const {
        category,
        description,
        image, // should be a base64 string or file buffer
        lat,
        lng,
        severity_level,
        estimated_people_affected,
      } = req.body;
      const user = req.user;

      const { valid, data, error } = validateIncident({
        category,
        description,
        lat,
        lng,
        severity_level,
        estimated_people_affected,
      });

      if (!valid) return res.status(400).json({ error });

      if (!image) {
        return res.status(400).json({ error: "Please provide an image" });
      }

      //Save temp file
      const tempPath = await saveTempFile(image);

      try {
        // Upload to Supabase
        const img_url = await uploadImageToSupabase(
          tempPath,
          `incident_${Date.now()}.jpg`,
          "incidents"
        );

        // Delete temp file
        await deleteTempFile(tempPath);

        // Build incident object
        const incident: Incident = {
          user_id: user.id,
          category: data?.category!,
          description: data?.description!,
          lat: data?.lat!,
          lng: data?.lng!,
          severity_level: data?.severity_level!,
          estimated_people_affected:
            data?.estimated_people_affected ?? undefined,
          agencies_assigned: [],
          status: "pending",
          img_url: img_url?.data?.publicUrl ?? undefined,
          created_at: new Date(),
        };

        console.log("incident ",incident)
        // TODO: save toi DB

        return res.status(200).json({ message: "Incident created", incident });
      } catch (uploadError) {
        // Delete temp file on error
        await deleteTempFile(tempPath);
        console.error(uploadError);
        return res.status(500).json({ error: "Failed to upload image" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }
);
