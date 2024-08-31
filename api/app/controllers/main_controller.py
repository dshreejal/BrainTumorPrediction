import time
from app.helpers.logger import get_logger
from flask import jsonify

logger = get_logger("controller")

class MainController:
    def heartbeat(self):
        hrtime = time.time_ns()
        logger.info(f"Heartbeat request at {hrtime}")
        return jsonify({'heartbeat': str(hrtime), "check":200}), 200