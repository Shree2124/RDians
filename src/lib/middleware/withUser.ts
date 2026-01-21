import { NextApiRequest, NextApiResponse } from "next";
import { createAdmin } from "../supabase/admin";

export const withUser = (handler: any) => {
  return async (req: NextApiRequest & { user?: any }, res: NextApiResponse) => {
    try {
      const authHeader = req.headers.cookie || req.headers.authorization;
      console.log("authHeader", authHeader);
      const supabaseAdmin = await createAdmin();

      const token = authHeader?.split(" ")[1];
      console.log("token ", token);

      if (!token) return res.status(401).json({ error: "unauthorized" });

      const data = await supabaseAdmin?.auth.getUser(token);
      console.log(data?.data, " error ", data?.error);

      if (data?.error || !data?.data) {
        return res.status(401).json({ error: "invalid token" });
      }

      req.user = data.data;
      return handler(req, res);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  };
};
