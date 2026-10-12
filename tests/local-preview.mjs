import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve, extname, sep} from 'node:path';
import {spawn} from 'node:child_process';
const root=process.cwd();
const server=http.createServer(async(req,res)=>{
 try{
  const path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if(path!==root&&!path.startsWith(root+sep)) {res.writeHead(403).end();return;}
  const file=path===root?resolve(root,'index.html'):path;
  res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'text/javascript'})[extname(file)]||'text/plain');
  res.end(await readFile(file));
 }catch{res.writeHead(404).end();}
});
server.listen(0,'127.0.0.1',()=>{
 const child=spawn(process.execPath,[process.env.PREVIEW_TEST || 'tests/entry-smoke.mjs'],{stdio:'inherit',env:{...process.env,LOCAL_SITE_URL:`http://127.0.0.1:${server.address().port}/`}});
 child.on('exit',code=>server.close(()=>{process.exitCode=code??1;}));
 child.on('error',error=>{console.error(error);server.close();process.exitCode=1;});
});
