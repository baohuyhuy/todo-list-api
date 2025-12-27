export const validate = (schema) => async (req, res, next) => {
  try {
    const result = await schema.safeParseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    if (!result.success) {
      return res
        .status(400)
        .json({ error: result.error.flatten().fieldErrors });
    }

    if (result.data.body) {
      req.body = result.data.body;
    }
    if (result.data.query) {
      req.locals.query = result.data.query;
    }
    if (result.data.params) {
      req.params = result.data.params;
    }
    next();
  } catch (error) {
    next(error);
  }
};
