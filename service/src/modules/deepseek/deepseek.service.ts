import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import { Observable } from 'rxjs'

const OPENAI = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-e89e18253d6b4c05becbc9cadaffcdd8'
}) 

@Injectable()
export class DeepSeekService {
  async create({ content }): Promise<any> {
    let completion = await OPENAI.chat.completions.create({
      messages: [
        { role: "system", content: content + '/n 请简要回答' },
      ],
      model: "deepseek-chat",
      "stream": true
    })
    // 返回一个 Observable
    return new Observable((observer) => {
      (async () => {
        for await (const chunk of completion) {
          const message = chunk.choices[0].delta.content;
          if (message) {
            observer.next(message); // 发送消息
          }
        }
        observer.complete()
      })();
    })
  }
  async mock({ content }): Promise<any> {
    let arr = []
    let str = '阿斯利康分拣索科洛啊三开间房空间看老四家阿福理科生就分开了是的肌肤看老四家快乐健康疗法阿娇索科洛夫就撒开了饭就撒开了房间卡拉斯京发看了几分卢卡斯家离开就夫健康老四家烧烤了介绍了咖啡机说了咖啡机老四会计法卢卡斯减肥理科生的肌肤可老四减肥卡拉斯京弗兰克睡觉啊弗兰克介绍了看法就是打开了饭介绍了会计法快乐撒减肥卡拉斯京发看老四家了会计法快乐时间到了库'
    let arr1 = [4, 9, 15, 23, 30, 45]
    for (let i = 0; i < str.length; i++) {
      arr.push(str[i] + (arr1.includes(i) ? '\n\n' : ''))
    }
    return new Observable((observer) => {
      (async () => {
        let count = 0
        setInterval(() => {
          if (count < arr.length) {
            observer.next(arr[count])
            count++
          } else {
            observer.complete()
          }
        }, 80)
      })();
    })
  }
}