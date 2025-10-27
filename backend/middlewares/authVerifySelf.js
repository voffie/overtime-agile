export function verifySelf(req, res, next) {
  const usernameFromParam = req.params.username;
  const usernameFromToken = req.user?.username;
  if (!usernameFromToken || usernameFromParam !== usernameFromToken) {
    return res.status(403).json({ error: "Forbidden: cannot act on another user" })

  }

  next();

}
