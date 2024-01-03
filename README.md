# logix_movie
1. Backend:
  + using net 8.
  + setup Migrations: set startup Logix.Movies.API and select project Logix.Movies.Infrastructure => run Package Manager Console Update-Database
  + setup MinIO: download https://dl.min.io/server/minio/release/windows-amd64/minio.exe. run cmd csript .\minio.exe server C:\minio --console-address :9001. read more setup link https://min.io/docs/minio/windows/index.html
2. FrontEnd:
  + Using Angular
  + start app => npm start
