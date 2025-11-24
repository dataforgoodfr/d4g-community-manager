import threading

class StatusManager:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(StatusManager, cls).__new__(cls)
                cls._instance.statuses = {}
        return cls._instance

    def update_status(self, service: str, status: str, message: str = ""):
        if service not in self.statuses:
            self.statuses[service] = []
        
        entry_exists = False
        for entry in self.statuses[service]:
            if entry.get("message") == message:
                entry['status'] = status
                entry_exists = True
                break
        
        if not entry_exists:
            self.statuses[service].append({"status": status, "message": message})

    def get_all_statuses(self):
        return self.statuses

status_manager = StatusManager()