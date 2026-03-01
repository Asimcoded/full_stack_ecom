export const healthCheckController = (req, res) => {
  res.json({
    success : true,
    message : "Api is working"
  })
}
import mongoose from 'mongoose';

export const dbCheckController = async (req, res) => {
  try {
    const state = mongoose.connection.readyState;

    if (state === 1) {
      return res.status(200).json({
        status: 'OK',
        db: 'connected',
        timestamp: new Date().toISOString()
      });
    }

    return res.status(500).json({
      status: 'ERROR',
      db: 'not connected',
      readyState: state
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: error.message
    });
  }
};
