namespace Logix.Movies.API.Services.Minio.Model
{
    public class PutObjectRequest
    {
        public string bucket { get; set; }
        public byte[] data { get; set; }
    }
}
