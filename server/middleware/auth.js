import jwt from "jsonwebtoken";

export const varifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization")
    if (!token) return res.status(403).json({error: "Access Denied"})

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1]
    }

    const varified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = varified
    next()
  } catch (error) {
    res.status(500).json({error: error.massege})
  }
}