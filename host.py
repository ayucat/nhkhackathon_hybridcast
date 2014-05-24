def request(context, flow):
    if flow.request.host.endswith("hc.nhk.or.jp"):
        if "/hybridcast/hc/dghome/" in flow.request.path:
            flow.request.host = "nhk.azurewebsites.net"
            flow.request.path = flow.request.path.replace("/hybridcast/hc/dghome/","/hc/")
            flow.request.headers["Host"] = ["nhk.azurewebsites.net"]
