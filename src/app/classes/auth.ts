export class AuthClass {
    validSession(Data: any): any {
        if (Data.data.success) {
            const matricule = Data.data.fields[0][0].matricule;
            const sessionType = Data.data.fields[0][0].session_type;
            return {
                matricule: matricule,
                sessionType: sessionType,
                url: '/home',
                sessionApproved: true
            };
        }
        return {
            matricule: 'undefined',
            sessionType: 'undefined',
            url: '/login',
            sessionApproved: false
        };
    }
}
