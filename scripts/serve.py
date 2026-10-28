#!/usr/bin/env python3
import http.server
import socketserver
import os
import re
import sys

class RangeFileWrapper:
    def __init__(self, file, length):
        self.file = file
        self.remaining = length

    def read(self, size=-1):
        if self.remaining <= 0:
            return b""
        if size < 0 or size > self.remaining:
            size = self.remaining
        data = self.file.read(size)
        self.remaining -= len(data)
        return data

    def close(self):
        self.file.close()

class RangeHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        super().end_headers()

    def send_head(self):
        if 'Range' not in self.headers:
            return super().send_head()

        path = self.translate_path(self.path)
        if not os.path.isfile(path):
            return super().send_head()

        range_header = self.headers['Range']
        match = re.match(r'bytes=(\d+)-(\d*)', range_header)
        if not match:
            return super().send_head()

        total_length = os.path.getsize(path)
        start = int(match.group(1))
        end = int(match.group(2)) if match.group(2) else total_length - 1

        if start >= total_length or end >= total_length or start > end:
            self.send_error(416, "Requested Range Not Satisfiable")
            return None

        content_length = end - start + 1
        self.send_response(206)
        ctype = self.guess_type(path)
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Range', f'bytes {start}-{end}/{total_length}')
        self.send_header('Content-Length', str(content_length))
        self.send_header('Last-Modified', self.date_time_string(os.path.getmtime(path)))
        self.end_headers()

        f = open(path, 'rb')
        f.seek(start)
        return RangeFileWrapper(f, content_length)

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    server_address = ('127.0.0.1', port)
    class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
        daemon_threads = True
        allow_reuse_address = True
    httpd = ThreadingHTTPServer(server_address, RangeHTTPRequestHandler)
    print(f"Serving HTTP on 127.0.0.1 port {port} with byte-range support...")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass

