import jwt from "jsonwebtoken";
const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.headers;
    console.log(token);
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized login Again",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
  
    const { id } = token_decode;
    req.userId = id;
    next();
  } catch (error) {
    console.log(
      "getting error during decode token and add id in reqbody",
      error,
    );
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;
