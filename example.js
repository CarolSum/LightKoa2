let Koa = require('./lib/application');
let app = new Koa();

// app.use((ctx, next) => {
//   ctx.res.writeHead(200);
//   ctx.res.end('hello world');
// });

app.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log(6);
});

app.use(async (ctx, next) => {
  console.log(2);
  await next();
  console.log(5);
});

app.use(async (ctx, next) => {
  console.log(3);
  throw new Error('something err!');
  ctx.body = 'hello world!';
  ctx.res.writeHead(200);
  ctx.res.end('hello world!');
  console.log(4);
});

app.listen(3000, ()=>{
  console.log('listening on 3000');
})