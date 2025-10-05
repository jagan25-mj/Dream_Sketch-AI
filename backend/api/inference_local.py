import io
import torch
from PIL import Image
from typing import Optional
import logging
from .model_loader import model_manager, DEVICE, DTYPE

logger = logging.getLogger(__name__)


def generate_image_local(
    model_id: str,
    prompt: str,
    negative_prompt: str = "",
    width: int = 512,
    height: int = 512,
    steps: int = 30,
    guidance_scale: float = 7.5,
    seed: Optional[int] = None,
) -> bytes:
    try:
        pipeline = model_manager.load_model(model_id)

        generator = None
        if seed is not None:
            generator = torch.Generator(device=DEVICE).manual_seed(seed)

        logger.info(f"Generating image with {model_id}: {prompt[:50]}...")

        with torch.inference_mode():
            result = pipeline(
                prompt=prompt,
                negative_prompt=negative_prompt if negative_prompt else None,
                width=width,
                height=height,
                num_inference_steps=steps,
                guidance_scale=guidance_scale,
                generator=generator,
            )

        image = result.images[0]

        buf = io.BytesIO()
        image.save(buf, format="PNG", optimize=True)
        buf.seek(0)

        logger.info(f"Image generated successfully")
        return buf.getvalue()

    except Exception as e:
        logger.error(f"Error generating image: {str(e)}")
        raise RuntimeError(f"Failed to generate image: {str(e)}")


def generate_image_batch(
    model_id: str,
    prompts: list[str],
    negative_prompt: str = "",
    width: int = 512,
    height: int = 512,
    steps: int = 30,
    guidance_scale: float = 7.5,
    seed: Optional[int] = None,
) -> list[bytes]:
    try:
        pipeline = model_manager.load_model(model_id)

        generator = None
        if seed is not None:
            generator = torch.Generator(device=DEVICE).manual_seed(seed)

        logger.info(f"Generating batch of {len(prompts)} images with {model_id}")

        images_bytes = []

        for prompt in prompts:
            with torch.inference_mode():
                result = pipeline(
                    prompt=prompt,
                    negative_prompt=negative_prompt if negative_prompt else None,
                    width=width,
                    height=height,
                    num_inference_steps=steps,
                    guidance_scale=guidance_scale,
                    generator=generator,
                )

            image = result.images[0]
            buf = io.BytesIO()
            image.save(buf, format="PNG", optimize=True)
            buf.seek(0)
            images_bytes.append(buf.getvalue())

        logger.info(f"Batch generation completed")
        return images_bytes

    except Exception as e:
        logger.error(f"Error in batch generation: {str(e)}")
        raise RuntimeError(f"Failed to generate batch: {str(e)}")


def img2img_generate(
    model_id: str,
    init_image: Image.Image,
    prompt: str,
    negative_prompt: str = "",
    strength: float = 0.75,
    steps: int = 30,
    guidance_scale: float = 7.5,
    seed: Optional[int] = None,
) -> bytes:
    try:
        from diffusers import StableDiffusionImg2ImgPipeline

        pipeline = model_manager.load_model(model_id)

        if not hasattr(pipeline, 'img2img'):
            logger.info(f"Converting pipeline to img2img mode")

        generator = None
        if seed is not None:
            generator = torch.Generator(device=DEVICE).manual_seed(seed)

        logger.info(f"Generating img2img with {model_id}: {prompt[:50]}...")

        with torch.inference_mode():
            result = pipeline(
                prompt=prompt,
                image=init_image,
                negative_prompt=negative_prompt if negative_prompt else None,
                strength=strength,
                num_inference_steps=steps,
                guidance_scale=guidance_scale,
                generator=generator,
            )

        image = result.images[0]

        buf = io.BytesIO()
        image.save(buf, format="PNG", optimize=True)
        buf.seek(0)

        logger.info(f"Img2img generated successfully")
        return buf.getvalue()

    except Exception as e:
        logger.error(f"Error in img2img generation: {str(e)}")
        raise RuntimeError(f"Failed to generate img2img: {str(e)}")
