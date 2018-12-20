<template>
    <div class="container app-body">
        <div class="row">
            <div class="col-sm-8 offset-sm-2">
                <form @keydown="person.errors.clear()">
                    <div class="form-group">
                        <label for="firstname">First Name</label>
                        <input type="text" class="form-control" id="firstname" v-model="person.firstname">
                        <small class="form-text bg-danger" v-show="person.errors.has('firstname')" v-text="person.errors.get('firstname')"></small>
                    </div>

                     <div class="form-group">
                        <label for="lastname">Last Name</label>
                        <input type="text" class="form-control" id="lastname" v-model="person.lastname">
                        <small class="form-text bg-danger" v-show="person.errors.has('lastname')" v-text="person.errors.get('lastname')"></small>
                    </div>

                    <button type="button" class="btn btn-primary" @click="addPerson">Add</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                person: new Form({
                    firstname: '',
                    lastname: ''
                })
            }
        },

        methods: {
            addPerson(){
                let self = this;
                self.person
                    .post('/persons')
                    .then(function(response){
                        Vue.swal('Success', 'A new person has been added.', 'success');
                    }).catch(function(error){

                    });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .form-group {
        position: relative;

        small {
            position: absolute;
            font-size: 13px;
            bottom: 5px;
            right: 5px;
            color: #fff;
            padding: 5px 10px;
            border-radius: 5px;
        }
    }
</style>
