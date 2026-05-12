import json
import os
import urllib.request


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта в Telegram"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    raw_body = event.get('body', '')
    try:
        body = json.loads(raw_body)
    except Exception:
        body = {}
    if not isinstance(body, dict):
        body = {}

    name = str(body.get('name', '')).strip()
    phone = str(body.get('phone', '')).strip()
    service = str(body.get('service', '')).strip()
    comment = str(body.get('comment', '')).strip()

    bot_token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = '722623121'

    lines = [
        '🏗 <b>Новая заявка с сайта:</b>',
        f'👤 <b>Имя:</b> {name}',
        f'📞 <b>Телефон:</b> {phone}',
    ]
    if service:
        lines.append(f'🔧 <b>Вид работ:</b> {service}')
    if comment:
        lines.append(f'💬 <b>Комментарий:</b> {comment}')

    text = '\n'.join(lines)

    url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    payload = json.dumps({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML',
    }).encode('utf-8')

    req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req) as resp:
        resp.read()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
