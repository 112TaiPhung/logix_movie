using System.ComponentModel;

namespace Logix.Movies.API.Authorization
{
    public enum CommandCode
    {
        #region Account
        [Description("Khóa tài khoản")]
        LOCK_ACCOUNT,

        [Description("Cập nhật tài khoản")]
        UPDATE_ACCOUNT,

        [Description("Tạo mới tài khoản")]
        CREATE_ACCOUNT,

        [Description("Xóa tài khoản")]
        DELETE_ACCOUNT,

        [Description("Đặt lại mật khẩu")]
        RESET_PASSWORD_ACCOUNT,

        [Description("Xem tài khoản")]
        VIEW_ACCOUNT,
         
        [Description("Thay đổi mật khẩu")]
        CHANGE_PASSWORD_ACCOUNT,
        #endregion 

        #region System
        [Description("Full quyền hệ thống")]
        FULL_CONTROLL
        #endregion
    }
}
