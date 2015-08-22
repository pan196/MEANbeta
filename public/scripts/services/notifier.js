app.factory('notifier', function(toastr) {
    return {
        success: function(msg, options) {
            toastr.success(msg, null, options);
        },
        error: function(msg, options) {
            toastr.error(msg, null, options);
        }
    }
});