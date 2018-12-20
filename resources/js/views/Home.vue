<template>
    <div class="container app-body">
        <div class="row">
            <div class="col-sm-8 offset-sm-2">
                <h1>List of Persons</h1>

                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col" colspan="2">Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(person, index) in persons" :key="person.id">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>
                                 <router-link :to="{ name: 'person', params: { id:person.id } }" tag="a" exact class="nav-link">
                                    {{ person.firstname }}
                                </router-link>
                            </td>
                            <td>{{ person.lastname }}</td>
                            <td style="white-space: nowrap !important; width: 100px;">
                                <button type="button" class="btn btn-danger" @click="deletePerson(person.id)">Delete</button>
                            </td>
                        </tr>
                        <tr v-if="persons.length == 0">
                            <td colspan="4" style="text-align: center;">There are no records yet.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                persons: []
            }
        },

        created(){
            this.getPersons();
        },

        methods: {
            getPersons(){
                let self = this;

                axios.get('persons')
                    .then(response => {
                        self.persons = response.data;
                    });
            },

            deletePerson(id){
                Vue.swal({
                    title: 'Hold on a sec...',
                    text: "Are you sure you want to delete this person? You won't be able to revert this.",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    let self = this;
                    let page = 1;
                    if (result.value) {
                        axios.delete('persons/' + id)
                            .then(function(response) {
                                Vue.swal(
                                   'Deleted!',
                                    'The persons is successfully deleted.',
                                    'success'
                                );

                                self.getPersons();
                            });
                    }

                })
            }
        }
    }
</script>
