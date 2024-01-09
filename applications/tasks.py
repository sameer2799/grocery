from celery import shared_task

@shared_task(ignore_result=False)
def say_hello():
    return "Hello World from celery!"