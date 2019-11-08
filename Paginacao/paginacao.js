function Employee ( name, position, salary, office ) {
    this.name = name;
    this.position = position;
    this.salary = salary;
    this._office = office;
 
    this.office = function () {
        return this._office;
    }
};
 
$('#example').DataTable( {
    data: [
        new Employee( "Tiger Nixon", "System Architect", "$3,120", "Edinburgh" ),
        new Employee( "Garrett Winters", "Director", "$5,300", "Edinburgh" )
    ],
    columns: [
        { data: 'name' },
        { data: 'salary' },
        { data: 'office' },
        { data: 'position' }
    ]
} );