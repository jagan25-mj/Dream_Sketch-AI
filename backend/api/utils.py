import torch
import logging
from typing import Dict, Any

logger = logging.getLogger(__name__)


def get_system_info() -> Dict[str, Any]:
    info = {
        "pytorch_version": torch.__version__,
        "cuda_available": torch.cuda.is_available(),
        "cuda_version": torch.version.cuda if torch.cuda.is_available() else None,
        "device_count": torch.cuda.device_count() if torch.cuda.is_available() else 0,
    }

    if torch.cuda.is_available():
        info["devices"] = []
        for i in range(torch.cuda.device_count()):
            device_info = {
                "index": i,
                "name": torch.cuda.get_device_name(i),
                "memory_total": torch.cuda.get_device_properties(i).total_memory,
                "memory_allocated": torch.cuda.memory_allocated(i),
                "memory_reserved": torch.cuda.memory_reserved(i),
            }
            info["devices"].append(device_info)

    return info


def format_bytes(bytes_val: int) -> str:
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if bytes_val < 1024.0:
            return f"{bytes_val:.2f} {unit}"
        bytes_val /= 1024.0
    return f"{bytes_val:.2f} PB"


def validate_generation_params(width: int, height: int, steps: int, guidance_scale: float) -> tuple[bool, str]:
    if width < 64 or width > 2048:
        return False, "Width must be between 64 and 2048"

    if height < 64 or height > 2048:
        return False, "Height must be between 64 and 2048"

    if width % 8 != 0 or height % 8 != 0:
        return False, "Width and height must be multiples of 8"

    if steps < 1 or steps > 150:
        return False, "Steps must be between 1 and 150"

    if guidance_scale < 1.0 or guidance_scale > 20.0:
        return False, "Guidance scale must be between 1.0 and 20.0"

    return True, ""
