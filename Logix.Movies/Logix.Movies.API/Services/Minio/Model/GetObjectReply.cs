using Minio.DataModel;

namespace Logix.Movies.API.Services.Minio.Model
{
    public class GetObjectReply
    {
        public ObjectStat objectstat { get; set; }
        public byte[] data { get; set; }
    }
}
