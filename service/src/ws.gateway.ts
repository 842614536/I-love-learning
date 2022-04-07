import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import * as WebSocket from 'ws';

@WebSocketGateway(8042)
export class WsStartGateway {
  @SubscribeMessage('getNewData')
  getData(@MessageBody() data: any, @ConnectedSocket() client: WebSocket): any {
    setInterval(() => {
      client.send({
        data: `${new Date().getTime()} 最新消息`,
      });
    }, 3000);
  }
}
