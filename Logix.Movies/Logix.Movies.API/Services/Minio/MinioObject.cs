using Logix.Movies.API.Services.Minio.Model;
using Logix.Movies.Core.Domain;
using Microsoft.Extensions.Options;
using Minio;
using Minio.DataModel.Args;
using Minio.Exceptions;
using System;
using System.Drawing;
using System.Runtime.Intrinsics.X86;
using System.Security.AccessControl;

namespace Logix.Movies.API.Services.Minio
{
    public class MinioObject
    {

        private readonly IMinioClient _minioClient;
        public MinioObject(IOptions<MinIOSettings> minIOSettings)
        {
            string endPoint = minIOSettings.Value.Endpoint;
            string accessKey = minIOSettings.Value.AccessKey;
            string secretKey = minIOSettings.Value.SecretKey;
            _minioClient = new MinioClient().WithEndpoint(endPoint)
            .WithCredentials(accessKey, secretKey)
            .Build();
        }

        public async Task<string> PutObjectAsync(string bucketName, IFormFile file)
        {
            string fileName = Path.GetFileNameWithoutExtension(file.FileName);
            fileName = fileName + "_" + DateTime.Now.ToString("yyyyMMddHHmmss");
            string ext = Path.GetExtension(file.FileName);
            var bktExistArgs = new BucketExistsArgs().WithBucket(bucketName);
            bool found = await _minioClient.BucketExistsAsync(bktExistArgs);
            if (!found)
            {
                var mbArgs = new MakeBucketArgs().WithBucket(bucketName);
                await _minioClient.MakeBucketAsync(mbArgs);
            }

            using (var fileStream = file.OpenReadStream())
            {
                var putObjectArgs = new PutObjectArgs()
                            .WithBucket(bucketName)
                            .WithObject(fileName)
                            .WithObjectSize(file.Length)
                            .WithStreamData(fileStream)
                            .WithContentType("application/octet-stream");

                await _minioClient.PutObjectAsync(putObjectArgs);
                var presignedGetObjectArgs = new PresignedGetObjectArgs().WithBucket(bucketName).WithObject(fileName);
                return await _minioClient.PresignedGetObjectAsync(presignedGetObjectArgs);
            }
        }
    }
}
