export default {
    watch(router) {
        router.beforeEach((to, from, next) => {
            if (to.name === 'detail' || to.name === 'edit') {
                let badge = document.querySelector('.resource-not-seen-count[data-resource=' + to.params.resourceName + ']');
                if (!badge) {
                    next();
                    return;
                }

                let query = '?model='
                    + badge.getAttribute('data-class')
                    + '&id='
                    + to.params.resourceId;

                Nova.request().get('/admin/check-resource-seen' + query)
                    .then((response) => {
                        if (!response.data.result || response.data.seen) {
                            return;
                        }

                        badge.innerHTML--;
                        if (parseInt(badge.innerHTML) === 0) {
                            badge.remove();
                        }
                    });
            }
            next();
        });
    }
}
