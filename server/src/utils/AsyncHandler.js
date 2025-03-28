const AsyncHandler = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default AsyncHandler;
