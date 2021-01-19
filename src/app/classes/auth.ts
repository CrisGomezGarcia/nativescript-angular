export class AuthClass {
    validSession(Data: any): any {
        if (Data.data.success) {
            const matricule = Data.data.fields[0].matricule;
            return {
                matricule: matricule,
                url: '/home',
                sessionApproved: true
            };
        }
        return {
            matricule: 'undefined',
            url: '/login',
            sessionApproved: false
        };
    }
}
