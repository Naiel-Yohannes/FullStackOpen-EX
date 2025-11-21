sequenceDiagram
    User->>Browser: Inserts a message and clicks save
    Browser->>Server: Add note to list and update the UI right away
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate Server
    Server-->>Browser: HTTP 201 Created
    deactivate Server
