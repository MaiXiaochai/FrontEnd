import * as express from 'express'
import {Server} from "ws";
import * as path from 'path';


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

// 当访问当前的'/'时，去访问client目录
app.use('/', express.static(path.join(__dirname, '..','client')));
// 首页
app.get('/', (req, res) => {
    res.send("Hello Express!");
});

// 所有商品详细信息
app.get('/api/products', (req, res) => {
    let result = products;
    let params = req.query; // {title: '大疆'，price: 20, category: '电子产品'}

    // 判断商品名称（title）
    if (params.title) {
        result = result.filter(
            (p) => p.title.indexOf(params.title) !== -1
        )
    }

    // 判断价格（price）,价格是数字
    if (params.price) {
        result = result.filter(
            (p) => p.price <= parseInt(params.price)
        )
    }

    // 判断商品类别(category)
    if (params.category !== '-1' && result.length > 0) {
        result = result.filter(
            (p) => p.categories.indexOf(params.category) !== -1
        )
    }
    res.jsonp(result);
});

// 根据商品id获取指定的商品信息
app.get('/api/product/:id', (req, res) => {
    // 这里的find注意，是用req.params.id做条件在products中查找
    res.jsonp(products.find((product) => product.id == parseInt(req.params.id)));
});

// 根据商品id获取指定的商品的评论信息
app.get('/api/product/:id/comments', (req, res) => {
    // 这里的find注意，是用req.params.id做条件在products中查找
    res.jsonp(comments.filter((comment: Comment) => comment.productId == parseInt(req.params.id)));
});

const server = app.listen(8000, "localhost", () => {
    const addr = 'http://localhost:8000';
    console.log('服务器已启动，地址是：' + addr);
});


//=====================================>>>[ WebSocket服务器启动相关 ]<<<=========================================
const subscriptions = new Map<any, number>();

// 创建一个服务器
const wsServer = new Server({port: 8085});
// 当有客户端连接到这个服务器时候，给客户端推送一个消息
wsServer.on("connection", websocket => {
    websocket.on('message', message => {
        let messageObj = JSON.parse(<string>message);
        // 能取到则用取到的值，否则是空数组
        let productIds = subscriptions.get(websocket) || [];
        // @ts-ignore
        subscriptions.set(websocket, [...productIds, messageObj.productId]);
    });
});

const currentBids = new Map<number, number>();
setInterval(() => {
    products.forEach( p => {
        // 模拟从其它客户端接收到新的报价
        let currentBid = currentBids.get(p.id) || p.price;
        let newBid = currentBid + Math.random() * 5;
        currentBids.set(p.id, newBid);
    });
    // 一个客户端可能关注很多商品报价，这里推送该客户端关注的一组商品的报价
    // @ts-ignore
    subscriptions.forEach((productIds: number[], ws) => {
        if (ws.readyState === 1) {
            let newBid = productIds.map(pid => ({
                productId: pid,
                bid: currentBids.get(pid)
            }));
            // JSON.stringify(newBid): [{"productId":1,"bid":1751.4301771710295}]
            ws.send(JSON.stringify(newBid));// JSON.stringify(newBid)
        } else {
            subscriptions.delete(ws);
        }
    });
}, 2000);
