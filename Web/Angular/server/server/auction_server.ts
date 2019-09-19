import * as express from 'express'
import {Server} from "ws";


// Product 包含了产品所包含的信息
export class Product {
    constructor(
        public id: number,
        public title: string,
        public price: number,
        public rating: number,
        public desc: string,
        public categories: Array<string>
    ) {}
}

// 商品评论类
export class Comment {
    constructor(
        public id: number,
        public productId: number,
        public timestamp: string,
        public user: string,
        public rating: number,
        public content: string
    ) {}
}

// 商品详情信息
let products: Product[] = [
    new Product(1, '慕手机Max', 1699, 4.5, '4100Ah快充/3G运存/6寸大屏', ['电子产品', '硬件']),
    new Product(2, '超级电视 S8', 2999, 4.0, '安卓智能/超高清', ['电子设备']),
    new Product(3, 'MoocBook Pro', 13999, 5, '新品抢先/精品外观/颜值逆天', ['硬件设备']),
    new Product(4, '扫地机器人', 1699, 4.0, '自主充电/完全自主/清扫面积大', ['电子产品']),
    new Product(5, '大疆云台', 1599, 4.5, '超长续航/充电五分钟，拍摄一小时', ['硬件设备']),
    new Product(6, '大疆无人机', 9999, 5.0, '30分钟续航/超清稳定/自主避障', ['硬件设备']),
    new Product(7, '《活着》', 35, 5.0, '余华/短篇小说/获奖作品', ['图书']),
];

// 评论详情信息
let comments: Comment[] = [
    new Comment(1, 1, '2019-8-22 16:58:19', 'LiMing', 3, 'Nice！'),
    new Comment(2, 1, '2019-8-22 16:58:19', 'Danny', 3, 'Good！'),
    new Comment(3, 1, '2019-8-22 16:58:19', 'Jenny', 3, 'Very good！'),
    new Comment(4, 2, '2019-8-22 16:58:19', 'ZhangQuandan', 3, 'stupid!'),
    new Comment(5, 5, '2019-8-22 16:58:19', 'ZhaoTiezhu', 3, '重金求子！'),
    new Comment(6, 6, '2019-8-22 16:58:19', 'LiCuihua', 3, '哎呀，妈呀！'),
    new Comment(7, 7, '2019-9-18 16:58:19', '宇智波·鼬', 5, '好书。'),
];

//=====================================>>>[ Http服务器启动相关 ]<<<=========================================
const app = express();

// 首页
app.get('/', (req, res) => {
    res.send("Hello Express!");
});

// 所有商品详细信息
app.get('/api/products', (req, res) => {
    res.json(products);
});

// 根据商品id获取指定的商品信息
app.get('/api/product/:id', (req, res) => {
    // 这里的find注意，是用req.params.id做条件在products中查找
    // @ts-ignore
    res(products.find((product) => product.id == req.params.id));
});

// 根据商品id获取指定的商品的评论信息
app.get('/api/product/:id', (req, res) => {
    // 这里的find注意，是用req.params.id做条件在products中查找
    // @ts-ignore
    res(comments.filter((comment: Comment) => comment.productId == req.params.id));
});

const server = app.listen(8000, "localhost", () => {
    const addr = 'http://localhost:8000';
    console.log('服务器已启动，地址是：' + addr);
});


//=====================================>>>[ WebSocket服务器启动相关 ]<<<=========================================
// 创建一个服务器
const wsServer = new Server({port: 8085});
// 当有客户端连接到这个服务器时候，给客户端推送一个消息
wsServer.on("connection", websocket => {
    websocket.send('这是服务器推送的消息');
    websocket.on('message', message => {
        console.log('接收到消息：' + message);
    })
});

setInterval(() => {
    // 如果有客户端连接上WebSocket服务器，定时向所有客户端推送消息
    if (wsServer.clients) {
        wsServer.clients.forEach(client => {
            client.send('这是定时推送');
        })
    }
}, 2000);
