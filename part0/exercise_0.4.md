sequenceDiagram
    User->>Browser: Message saved
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Activate Server
    Server-->>Browser: HTTP 302 Redirect to notes
    Deactivate Server
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    Activate Server
    Server-->>Browser: HTML Document
    Deactivate Server
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Activate Server
    Server-->>Browser: CSS Document
    Deactivate Server
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    Activate Server
    Server-->>Browser: JavaScript Document
    Deactivate Server
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Activate Server
    Server-->>Browser: [{"content": "new"},...]
    Deactivate Server
