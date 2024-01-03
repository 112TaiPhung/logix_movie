using Logix.Movies.Core.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Core.Dtos
{
    public class CreateUpdateListBaseDto<T>
    {
        public T Id { get; set; }

        [MaxLength(ListBaseEntityConsts.NameMaxLength)]
        public string Name { get; set; }
         
        [MaxLength(ListBaseEntityConsts.CodeMaxLength)]
        public string Code { get; set; }
    }
    public class CreateUpdateListBaseDto : CreateUpdateListBaseDto<Guid?>
    {
    }

}
