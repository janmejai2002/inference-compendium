import re,sys
seen=[];out=[]
for line in open(sys.argv[1],encoding="utf-8"):
    m=re.match(r"(\d\d:\d\d:\d\d)\.\d+ -->",line)
    if m: ts=m.group(1); continue
    t=re.sub(r"<[^>]+>","",line).strip()
    if not t or t.startswith(("WEBVTT","Kind:","Language:")) or t in seen[-3:]: continue
    seen.append(t); out.append(f"[{ts}] {t}")
# collapse into ~30s paragraphs
para=[];cur=None;buf=[]
for l in out:
    ts=l[1:9]; mm=int(ts[:2])*60+int(ts[3:5])
    if cur is None or mm-cur>=1: 
        if buf: para.append(buf[0][:10]+" "+" ".join(b[11:] for b in buf))
        buf=[];cur=mm
    buf.append(l)
if buf: para.append(buf[0][:10]+" "+" ".join(b[11:] for b in buf))
open(sys.argv[2],"w",encoding="utf-8").write("\n".join(para))
