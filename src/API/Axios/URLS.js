

import { BASE_URL } from "../../settings/settings";


const URLS = {
    BASE_URL: BASE_URL,
    login: 'api-token-auth/',
    signUp: 'sign-up',
    ResetPassword: 'reset-password',
    ValidateOtp: 'validate-otp',
    SetNewPassword: 'set-new-password',
    getApplications: 'https://digidocs.hisabkitab.pk/student-api/drop-form-query?status=PENDING',
    UploadFile: 'upload-file',
    DropForm: 'https://digidocs.hisabkitab.pk/student-api/drop-form',
    createStudent: "https://digidocs.hisabkitab.pk/digi-admin/students",
    createFaculty: "https://digidocs.hisabkitab.pk/digi-admin/staff",
    ListStudent: "https://digidocs.hisabkitab.pk/digi-admin/search-students",
    listFaculty: "https://digidocs.hisabkitab.pk/digi-admin/search-staff",
    deleteStudent: "https://digidocs.hisabkitab.pk/digi-admin/students/:id",
    deleteFaculty: "https://digidocs.hisabkitab.pk/digi-admin/staff/:id",
    listTeachers: "https://digidocs.hisabkitab.pk/student-api/teacher-query",
    listApplications: "https://digidocs.hisabkitab.pk/digi-admin/course-drop-list",
    listGenericForms: "https://digidocs.hisabkitab.pk/digi-admin/generic-form-list",
    approveApplication: "https://digidocs.hisabkitab.pk/digi-admin/drop-form-approve-reject",
    adminApproveApplication: "https://digidocs.hisabkitab.pk/digi-admin/staff-generic-form-approve-reject/41",
    genericForm: "https://digidocs.hisabkitab.pk/student-api/generic-form",
    listTeachers: "https://digidocs.hisabkitab.pk/student-api/teacher-query",
    uploadFile: "https://digidocs.hisabkitab.pk/student-api/generic-form",
    facultyToHr: "https://digidocs.hisabkitab.pk/digi-admin/staff-generic-form",
    facultyToHrRequests:"https://digidocs.hisabkitab.pk/digi-admin/search-staff-generic-form",
    staffHistory:"https://digidocs.hisabkitab.pk/digi-admin/staff-generic-form-query"
}


export default URLS;
