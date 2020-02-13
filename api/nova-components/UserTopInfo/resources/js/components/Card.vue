<template>
    <card v-if="user" class="user-top-info flex flex-col">
        <div class="flex w-full px-3 py-3">
            <div class="flex w-1/2 items-center">
<!--                <div class="mx-2">-->
<!--                    back-->
<!--                </div>-->
                <div class="mx-2">
                    <div class="user-avatar"></div>
                </div>
                <div class="flex flex-col mx-2">
                    <div class="text-xl font-bold mb-2">
                        {{user.name}}
                    </div>
                    <div class="text-sm">
                        {{user.type.display_name}}
                        <span
                            class="rounded px-2 py-1 ml-1"
                            :class="getStatusBgColor(user.status)"
                        >
                            {{user.readable_status}}
                        </span>
                    </div>
                </div>
            </div>
            <div class="flex w-1/2 items-end justify-end">
                <button class="btn btn-default btn-danger mr-2" @click="rejectModal">REFUSE</button>
                <button class="btn btn-default btn-primary" @click="confirm">CONFIRM</button>
            </div>
        </div>

        <div v-if="user.status === 2" class="w-full bg-danger rounded px-4 py-2 my-5">
            Account not verified due to:
            <span class="font-bold">{{user.rejected_reason}}</span>
        </div>

        <modal v-if="showRejectedModal">
            <form
                @submit.prevent.stop
                class="bg-white rounded-lg shadow-lg overflow-hidden"
                style="width: 460px"
            >
                <slot :uppercaseMode="uppercaseMode">
                    <div class="p-8">
                        <heading :level="2" class="mb-6">Write down the reason for refusal</heading>
                        <div class="form-group">
                            <textarea
                                id="value"
                                v-model="rejected_reason"
                                type="text"
                                placeholder="Enter here the text"
                                class="w-full form-input form-input-bordered"
                                rows="4"
                            ></textarea>
                        </div>
                    </div>
                </slot>

                <div class="bg-30 px-6 py-3 flex">
                    <div class="ml-auto">
                        <button type="button" data-testid="cancel-button" dusk="cancel-general-button" @click="rejectModal" class="btn text-80 font-normal h-9 px-3 mr-3 btn-link">Cancel</button>
                        <button id="confirm-delete-button" ref="confirmButton" data-testid="confirm-button" @click="reject" class="btn btn-default btn-danger">Save</button>
                    </div>
                </div>
            </form>
        </modal>
    </card>
</template>

<script>


export default {
    props: [
        'card',

        // The following props are only available on resource detail cards...
        'resource',
        'resourceId',
        'resourceName',
    ],

    data() {
        return {
            user: null,
            showRejectedModal: false,
            rejected_reason: null,
        };
    },

    computed: {
        // user() {
        //     let user = {};
        //
        //     for (let i in this.resource.fields) {
        //         user[this.resource.fields[i].attribute] = this.resource.fields[i].value;
        //     }
        //
        //     console.log(user);
        //
        //     return user;
        // },
    },

    mounted() {
        this.loadUser();
    },

    methods: {
        getStatusBgColor(status) {
            if (status === 0) {
                return 'bg-warning'
            }

            if (status === 1) {
                return 'bg-success'
            }

            if (status === 2) {
                return 'bg-danger'
            }
        },
        loadUser() {
            Nova.request().get('/admin/users/' + this.resourceId).then(response => {
                this.user = response.data;
            })
        },
        confirm() {
            Nova.request().post('/admin/users/' + this.resourceId + '/confirm').then(response => {
                this.user = response.data;

                this.$toasted.show('User confirmed', { type: 'success' });

                this.loadUser();
            }).catch(error => {
                this.handleErrors(error.response.data.errors);
            });
        },
        rejectModal() {
            this.showRejectedModal = !this.showRejectedModal;
        },
        reject() {
            Nova.request().post('/admin/users/' + this.resourceId + '/reject', {reason: this.rejected_reason}).then(response => {
                this.user = response.data;

                this.$toasted.show('User refused', { type: 'success' });
                this.showRejectedModal = false;
                this.rejected_reason = null;

                this.loadUser();
            }).catch(error => {
                this.handleErrors(error.response.data.errors);
            });
        },
        handleErrors(errors) {
            for (let i in errors) {
                for (let k in errors[i]) {
                    this.$toasted.show(errors[i][k], { type: 'error' })
                }
            }
        },
    },
}
</script>
