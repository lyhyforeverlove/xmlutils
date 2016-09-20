'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
                $urlRouterProvider
                    .otherwise('/app/teachManage/diagGoods');
                /*.otherwise('/auth/login');*/
                $stateProvider
                /**/
                    .state('app.auth', {
                        abstract: true,
                        url: '/auth',
                        template: '<div ui-view class="fade-in"></div>',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('admin/auth/ctrl.js');
                                }
                            ]
                        }
                    })
                    .state('auth.loading', {
                        url: '/loading',
                        templateUrl: 'admin/auth/loading.html',
                    })
                    .state('auth.login', {
                        url: '/login',
                        templateUrl: 'admin/auth/login.html',
                    })
                    //首页
                    .state('auth.index', {
                        url: '/index',
                        templateUrl: 'admin/auth/index.html',
                    })
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'admin/app.html',
                    })
                    .state('app.news', {
                        abstract: true,
                        url: '/news',
                        template: '<div ui-view class="fade-in"></div>',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('admin/news/ctrl.js');
                                }
                            ]
                        }
                    })
                    .state('app.news.list', {
                        url: '/list?page&search',
                        templateUrl: 'admin/news/list.html',
                    })
                    .state('app.news.detail', {
                        url: '/detail',
                        templateUrl: 'admin/news/detail.html',
                    })
                    .state('app.news.create', {
                        url: '/create',
                        templateUrl: 'admin/news/detail.html',
                    })
                    .state('app.teachManage', {
                        abstract: true,
                        url: '/teachManage',
                        template: '<div ui-view class="fade-in"></div>',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load("admin/teachManage/js/controller.js");
                                }
                            ]
                        }
                    })
                    .state('app.teachManage.create', {
                        url: '/create',
                        templateUrl: 'admin/teachManage/createDiagnosis.html',
                    })
                    .state('app.teachManage.allot', {
                        url: '/allot/:jsonString',
                        templateUrl: 'admin/teachManage/diagnosisDate.html',
                    })
                    .state('app.teachManage.diagGoods', {
                        url: '/diagGoods',
                        templateUrl: 'admin/teachManage/diagnosisGoods.html',
                    })
                    .state('app.teachManage.goodsDetail', {
                        url: '/goodsDetail',
                        templateUrl: 'admin/teachManage/goodsDetail.html',
                    })
                    .state('app.teachManage.firstPool', {
                        url: '/testPoolByFirst',
                        templateUrl: 'admin/teachManage/testPoolByFirst.html',
                    })
                    .state('app.teachManage.secondPool', {
                        url: '/testPoolBySecond',
                        templateUrl: 'admin/teachManage/testPoolBySecond.html',
                    })
                    .state('app.teachManage.round', {
                        url: '/round',
                        templateUrl: 'admin/teachManage/roundSentence.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load("admin/teachManage/js/roundSentence.js");
                                }
                            ]
                        }
                    })
                    .state('app.teachManage.exam', {
                        url: '/exam/:jsonString',
                        templateUrl: 'admin/teachManage/examDetail.html',
                         resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load("admin/teachManage/js/roundSentence.js");
                                }
                            ]
                        }
                    })
                    .state('app.teachManage.secondRound', {
                        url: '/secondRound',
                        templateUrl: 'admin/teachManage/secondRoundSentence.html',
                         resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load("admin/teachManage/js/roundSentence.js");
                                }
                            ]
                        }
                    })
                    .state('app.teachManage.examConfrim', {
                        url: '/examConfrim',
                        templateUrl: 'admin/teachManage/examConfrim.html',
                    })
                    .state('app.teachManage.examMonitor', {
                        url: '/examMonitor',
                        templateUrl: 'admin/teachManage/examMonitor.html',
                    })
                    .state('app.teachManage.monitorRoom', {
                        url: '/monitorRoom',
                        templateUrl: 'admin/teachManage/monitorRoom.html',
                    })
                    .state('app.teachManage.shortBoard', {
                        url: '/shortBoard',
                        templateUrl: 'admin/teachManage/shortBoardDiag.html',
                    })
                    .state('app.teachManage.notConform', {
                        url: '/notConform',
                        templateUrl: 'admin/teachManage/notConform.html',
                    })
                    .state('app.teachManage.shortBoardClass', {
                        url: '/shortBoardClass',
                        templateUrl: 'admin/teachManage/shortBoardClass.html',
                    })
                    .state('app.teachManage.dividingClasses', {
                        url: '/dividingClasses',
                        templateUrl: 'admin/teachManage/dividingClasses.html',
                    })
                    .state('app.teachManage.divideClassesConfrim', {
                        url: '/divideClassesConfrim',
                        templateUrl: 'admin/teachManage/divideClassesConfrim.html',
                    })
                    .state('app.teachManage.DiagDeportDetails', {
                        url: '/DiagDeportDetails',
                        templateUrl: 'admin/common/tpl/DiagDeportDetails.html',
                    })
                    .state('app.teachManage.look', {
                        url: '/look',
                        templateUrl: 'admin/teachManage/look.html',
                    })
                    .state('app.teachManage.monitorTeacher', {
                        url: '/monitorTeacher',
                        templateUrl: 'admin/teachManage/monitorTeacher.html',
                    })
                    /*
                     *教研管理
                     */
                    .state('app.teachResearchManage', {
                        abstract: true,
                        url: '/teachResearchManage',
                        template: '<div ui-view class="fade-in"></div>',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['admin/teachResearchManage/js/controller.js',
                                        'admin/teachResearchManage/js/controllerLY.js',
                                        'admin/teachResearchManage/js/controllerHXY.js',
                                        'admin/teachResearchManage/js/areaCategory.js',
                                        'admin/teachResearchManage/js/controllerDR.js'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.teachResearchManage.markReview', {
                        url: '/markReview',
                        templateUrl: 'admin/teachResearchManage/markReview.html',
                    })
                    .state('app.teachResearchManage.diagExamList', {
                        url: '/diagExamList',
                        templateUrl: 'admin/teachResearchManage/diagExamList.html',
                    })
                    .state('app.teachResearchManage.doubleList', {
                        url: '/doubleList',
                        templateUrl: 'admin/teachResearchManage/doubleList.html',
                    })
                    .state('app.teachManage.ExamPaperDetails', {
                        url: '/ExamPaperDetails/{id}',
                        templateUrl: 'admin/common/tpl/ExamPaperDetails.html',
                    })
                    .state('app.teachResearchManage.groupsDetail', {
                        url: '/groupsDetail/{complexPaperCode}',
                        templateUrl: 'admin/common/tpl/groupsDetail.html',
                    })
                    .state('app.teachResearchManage.detail', {
                        url: '/detail/{paperCode}',
                        templateUrl: 'admin/common/tpl/detail.html',
                    })
                    .state('app.teachResearchManage.createDiag', {
                        url: '/createDiag',
                        templateUrl: 'admin/teachResearchManage/createDiag.html',
                    })
                    .state('app.teachResearchManage.studentCategory', {
                        url: '/studentCategory',
                        templateUrl: 'admin/teachResearchManage/studentCategory.html',
                    })
                    .state('app.teachResearchManage.confromToVip', {
                        url: '/confromToVip',
                        templateUrl: 'admin/teachResearchManage/confromToVip.html',
                    })
                    .state('app.teachResearchManage.shortBoardConfrim', {
                        url: '/shortBoardConfrim',
                        templateUrl: 'admin/teachResearchManage/shortBoardConfrim.html',
                    })
                    .state('app.teachResearchManage.shortBoardPaper', {
                        url: '/shortBoardPaper',
                        templateUrl: 'admin/teachResearchManage/shortBoardPaper.html',
                    })
                    .state('app.teachResearchManage.addClasses', {
                        url: '/addClasses',
                        templateUrl: 'admin/teachResearchManage/shortBoardAddClass.html',
                    })
                    .state('app.teachResearchManage.notConform', {
                        url: '/notConform',
                        templateUrl: 'admin/teachResearchManage/notConform.html',
                    })
                    .state('app.teachResearchManage.category', {
                        url: '/category',
                        templateUrl: 'admin/teachResearchManage/courseCategory.html',
                    })
                    .state('app.teachResearchManage.analyse', {
                        url: '/analyse',
                        templateUrl: 'admin/teachResearchManage/shortBoardAnalyse.html',
                    })
                    .state('app.teachResearchManage.createCourse', {
                        url: '/createCourse',
                        templateUrl: 'admin/teachResearchManage/createCourse.html',
                    })
                    .state('app.teachResearchManage.createSingle', {
                        url: '/createSingle/{resourcePaperCode}',
                        templateUrl: 'admin/teachResearchManage/createSingle.html',
                    })
                     .state('app.teachResearchManage.paperList', {
                        url: '/paperList/{subjectCode}',
                        templateUrl: 'admin/teachResearchManage/addGroupsPaper.html',
                    })
                    .state('app.teachResearchManage.createDouble', {
                        url: '/createDouble/{diagnosisPaperCode}',
                        templateUrl: 'admin/teachResearchManage/createDouble.html',
                    })
                    .state('app.teachResearchManage.stageList', {
                        url: '/stageList',
                        templateUrl: 'admin/teachResearchManage/stageExamList.html',
                    })
                    .state('app.teachResearchManage.createStage', {
                        url: '/createStage',
                        templateUrl: 'admin/teachResearchManage/createStage.html',
                    })
                    .state('app.teachResearchManage.courseList', {
                        url: '/courseList',
                        templateUrl: 'admin/teachResearchManage/courseList.html',
                    })
                    .state('app.teachResearchManage.courseDeatil', {
                        url: '/courseDeatil/{courseSystemCode}',
                        templateUrl: 'admin/teachResearchManage/courseDeatil.html',
                    })
                    .state('app.teachResearchManage.areaCategory', {
                        url: '/areaCategory',
                        templateUrl: 'admin/teachResearchManage/areaCategory.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('admin/teachResearchManage/js/areaCategory.js');
                                }
                            ]
                        }
                    })
                    .state('app.teachResearchManage.courseTree', {
                        url: '/courseTree',
                        templateUrl: 'admin/teachResearchManage/courseTree.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/tree.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.teachResearchManage.headSchool', {
                        url: '/headSchool',
                        templateUrl: 'admin/teachResearchManage/createHeadSchool.html'
                    })
                    .state('app.teachResearchManage.schoolBranch', {
                        url: '/schoolBranch',
                        templateUrl: 'admin/teachResearchManage/createSchoolBranch.html'
                    })
                    .state('app.teachResearchManage.subjectCenter', {
                        url: '/subjectCenterList',
                        templateUrl: 'admin/teachResearchManage/subjectCenterList.html'
                    })
                    .state('app.teachResearchManage.createSchool', {
                        url: '/createSchool',
                        templateUrl: 'admin/teachResearchManage/addHeadSchool.html'
                    })
                    .state('app.teachResearchManage.changeCourseType', {
                        url: '/changeCourseType',
                        templateUrl: 'admin/teachResearchManage/changeCourseType.html'
                    })

                
                .state('app.largeClassManage', { //配置调课管理
                        abstract: true,
                        url: '/largeClassManage',
                        template: '<div ui-view class="fade-in"></div>',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('admin/largeClassManage/controller.js');
                                }
                            ]
                        }
                    })
                    .state('app.largeClassManage.largeClass', {
                        url: '/largeClass',
                        templateUrl: 'admin/largeClassManage/largeClasses.html'
                    })
                    .state('app.largeClassManage.largeClassDetail', {
                        url: '/largeClassDetail',
                        templateUrl: 'admin/largeClassManage/largeClassDetail.html'
                    })
                    .state('app.teacherOpearteManage', { //教师操作
                        abstract: true,
                        url: '/teacherOpearteManage',
                        template: '<div ui-view class="fade-in"></div>',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['admin/teacherOpearteManage/controller.js'
                                    ,'admin/teacherOpearteManage/controllerDR.js']);
                                }
                            ]
                        }
                    })
                    .state('app.teacherOpearteManage.oneToOneAdjustCourse', {
                        url: '/oneToOneAdjustCourse',
                        templateUrl: 'admin/teacherOpearteManage/oneToOneAdjustCourse.html'
                    })
                    .state('app.teacherOpearteManage.classSchedule', {
                        url: '/classSchedule/{id}/{scheduleStatus}',
                        templateUrl: 'admin/teacherOpearteManage/classSchedule.html'
                    })
                    .state('app.teacherOpearteManage.oneToOneOperate', {
                        url: '/oneToOneOperate',
                        templateUrl: 'admin/teacherOpearteManage/oneToOneOperate.html'
                    })
                    .state('app.teacherOpearteManage.enterTheClassroom', {
                        url: '/enterTheClassroom',
                        templateUrl: 'admin/teacherOpearteManage/enterTheClassroom.html'
                    })
                    .state('app.teacherOpearteManage.myStudents', {
                        url: '/myStudent',
                        templateUrl: 'admin/teacherOpearteManage/myStudents.html'
                    })
                    .state('app.teacherOpearteManage.learningDetail', {
                        url: '/learningDetail/',
                        templateUrl: 'admin/teacherOpearteManage/learningDetail.html'
                    })
                    .state('app.teacherOpearteManage.studentWork', {
                        url: '/studentWork',
                        templateUrl: 'admin/teacherOpearteManage/studentWork.html'
                    })
                    .state('app.teacherOpearteManage.studentWorkChecked', {
                        url: '/studentWorkChecked',
                        templateUrl: 'admin/teacherOpearteManage/studentWorkChecked.html'
                    })
                    .state('app.teacherOpearteManage.autonomousPushResources', {
                        url: '/autonomousPushResources',
                        templateUrl: 'admin/teacherOpearteManage/autonomousPushResources.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('angularBootstrapNavTree');
                                }
                            ]
                        }
                    })
                    .state('app.teacherOpearteManage.studentExams', {
                        url: '/studentExams',
                        templateUrl: 'admin/teacherOpearteManage/studentExams.html'
                    })
                    .state('app.teacherOpearteManage.stageExams', {
                        url: '/stageExams',
                        templateUrl: 'admin/teacherOpearteManage/stageExams.html'
                    })
                    .state('app.teacherOpearteManage.paperDetail', {
                        url: '/paperDetail',
                        templateUrl: 'admin/teacherOpearteManage/paperDetail.html'
                    })
                    .state('app.teacherOpearteManage.paperChecked', {
                        url: '/paperChecked',
                        templateUrl: 'admin/teacherOpearteManage/paperChecked.html'
                    })
                    .state('app.teacherOpearteManage.diagnoseInvigilation', {
                        url: '/diagnoseInvigilation',
                        templateUrl: 'admin/teacherOpearteManage/diagnoseInvigilation.html'
                    })
                    .state('app.teacherOpearteManage.supplementaryMaterials', {
                        url: '/supplementaryMaterials',
                        templateUrl: 'admin/teacherOpearteManage/supplementaryMaterials.html'
                    })
                    .state('app.teacherOpearteManage.teachingDifficultPoint', {
                        url: '/teachingDifficultPoint',
                        templateUrl: 'admin/teacherOpearteManage/teachingDifficultPoint.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('angularBootstrapNavTree');
                                }
                            ]
                        }
                    })
                    .state('app.teacherOpearteManage.classOnDuty', {
                        url: '/classOnDuty',
                        templateUrl: 'admin/teacherOpearteManage/classOnDuty.html'
                    })
                    .state('app.teacherOpearteManage.answerQuestions', {
                        url: '/answerQuestions',
                        templateUrl: 'admin/teacherOpearteManage/answerQuestions.html'
                    })
                    .state('app.teacherOpearteManage.answerQuestionsDetail', {
                        url: '/answerQuestionsDetail',
                        templateUrl: 'admin/teacherOpearteManage/answerQuestionsDetail.html'
                    })
                    .state('app.authorityManage', { //权限管理
                        abstract: true,
                        url: '/authorityManage',
                        template: '<div ui-view class="fade-in"></div>',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['admin/authorityManage/controller.js',
                                        'admin/authorityManage/js/schoolController.js',
                                        'admin/authorityManage/js/classController.js'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.authorityManage.masterSchool', {
                        url: '/masterSchool',
                        templateUrl: 'admin/authorityManage/masterSchool.html'
                    })

                .state('app.authorityManage.masterSchoolDetail', {
                        url: '/masterSchoolDetail',
                        templateUrl: 'admin/authorityManage/masterSchoolDetail.html'
                    })
                    .state('app.authorityManage.updateMasterSchool', {
                        url: '/updateMasterSchool',
                        templateUrl: 'admin/authorityManage/updateMasterSchool.html'
                    })
                    .state('app.authorityManage.branchSchool', {
                        url: '/branchSchool',
                        templateUrl: 'admin/authorityManage/branchSchool.html'
                    })
                    .state('app.authorityManage.branchSchoolDetail', {
                        url: '/branchSchoolDetail',
                        templateUrl: 'admin/authorityManage/branchSchoolDetail.html'
                    })
                    .state('app.authorityManage.updateBranchSchool', {
                        url: '/updateBranchSchool',
                        templateUrl: 'admin/authorityManage/updateBranchSchool.html'
                    })
                    .state('app.authorityManage.districtSchool', {
                        url: '/districtSchool',
                        templateUrl: 'admin/authorityManage/districtSchool.html'
                    })
                    .state('app.authorityManage.districtSchoolDetail', {
                        url: '/districtSchoolDetail',
                        templateUrl: 'admin/authorityManage/districtSchoolDetail.html'
                    })
                    .state('app.authorityManage.updateDistrictSchool', {
                        url: '/updateDistrictSchool',
                        templateUrl: 'admin/authorityManage/updateDistrictSchool.html'
                    })
                    .state('app.authorityManage.departmentSchool', {
                        url: '/departmentSchool',
                        templateUrl: 'admin/authorityManage/departmentSchool.html'
                    })
                    .state('app.authorityManage.departmentSchoolDetail', {
                        url: '/departmentSchoolDetail',
                        templateUrl: 'admin/authorityManage/departmentSchoolDetail.html'
                    })
                    .state('app.authorityManage.updateDepartmentSchool', {
                        url: '/updateDepartmentSchool',
                        templateUrl: 'admin/authorityManage/updateDepartmentSchool.html'
                    })
                    .state('app.authorityManage.centreOfSchool', {
                        url: '/centreOfSchool',
                        templateUrl: 'admin/authorityManage/centreOfSchool.html'
                    })
                    .state('app.authorityManage.centreOfSchoolDetail', {
                        url: '/centreOfSchoolDetail',
                        templateUrl: 'admin/authorityManage/centreOfSchoolDetail.html'
                    })
                    .state('app.authorityManage.updateCentreOfSchool', {
                        url: '/updateCentreOfSchool',
                        templateUrl: 'admin/authorityManage/updateCentreOfSchool.html'
                    })
                    .state('app.authorityManage.classAndGrade', {
                        url: '/classAndGrade',
                        templateUrl: 'admin/authorityManage/classAndGrade.html'
                    })

                    .state('app.authorityManage.classAndGradeDetail', {
                        url: '/classAndGradeDetail/{classAndGrade}',
                        templateUrl: 'admin/authorityManage/classAndGradeDetail.html'
                    })
                    .state('app.authorityManage.updateClassAndGrade', {
                        url: '/updateClassAndGrade/{classAndGrade}',
                        templateUrl: 'admin/authorityManage/updateClassAndGrade.html'
                    })

                    .state('app.authorityManage.addMasterSchool', {
                        url: '/addMasterSchool',
                        templateUrl: 'admin/authorityManage/addMasterSchool.html'
                    })
                    .state('app.authorityManage.addBranchSchool', {
                        url: '/addBranchSchool',
                        templateUrl: 'admin/authorityManage/addBranchSchool.html'
                    })
                    .state('app.authorityManage.addDistrictSchool', {
                        url: '/addDistrictSchool',
                        templateUrl: 'admin/authorityManage/addDistrictSchool.html'
                    })
                    .state('app.authorityManage.addDepartmentSchool', {
                        url: '/addDepartmentSchool',
                        templateUrl: 'admin/authorityManage/addDepartmentSchool.html'
                    })
                    .state('app.authorityManage.addCentreOfSchool', {
                        url: '/addCentreOfSchool',
                        templateUrl: 'admin/authorityManage/addCentreOfSchool.html'
                    })

                .state('app.authorityManage.largeClasses', {
                        url: '/largeClasses',
                        templateUrl: 'admin/authorityManage/largeClasses.html'
                    })
                    .state('app.authorityManage.smallClasses', {
                        url: '/smallClasses',
                        templateUrl: 'admin/authorityManage/smallClasses.html'
                    })
                    .state('app.authorityManage.oneToOneClasses', {
                        url: '/oneToOneClasses',
                        templateUrl: 'admin/authorityManage/oneToOneClasses.html'
                    })
                    .state('app.authorityManage.addClassAndGrade', {
                        url: '/addClassAndGrade',
                        templateUrl: 'admin/authorityManage/addClassAndGrade.html'
                    })
                    .state('app.authorityManage.largeClassSchedule', {
                        url: '/largeClassSchedule/{centreOfSchool}',
                        templateUrl: 'admin/authorityManage/largeClassSchedule.html'
                    })
                    .state('app.authorityManage.smallClassSchedule', {
                        url: '/smallClassSchedule/{studyGroup}',
                        templateUrl: 'admin/authorityManage/smallClassSchedule.html'
                    })
                    .state('app.authorityManage.oneToOneClassesSchedule', {
                        url: '/oneToOneClassesSchedule/{oneToOneClass}',
                        templateUrl: 'admin/authorityManage/oneToOneClassesSchedule.html'
                    })
                    .state('app.authorityManage.partTimeTeacherManage', {
                        url: '/partTimeTeacherManage',
                        templateUrl: 'admin/authorityManage/partTimeTeacherManage.html'
                    })
                    .state('app.authorityManage.fullTimeTeacherManage', {
                        url: '/fullTimeTeacherManage',
                        templateUrl: 'admin/authorityManage/fullTimeTeacherManage.html'
                    })
                    .state('app.authorityManage.schoolRollManage', {
                        url: '/schoolRollManage',
                        templateUrl: 'admin/authorityManage/schoolRollManage.html'
                    })
                    .state('app.authorityManage.addPartTimeTeacher', {
                        url: '/addPartTimeTeacher',
                        templateUrl: 'admin/authorityManage/addPartTimeTeacher.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('admin/common/js/directives/freeTime.js');
                                }
                            ]
                        }
                    })
                    .state('app.authorityManage.partTimeTeacherDetail', {
                        url: '/partTimeTeacherDetail/{partTeacher}',
                        templateUrl: 'admin/authorityManage/partTimeTeacherDetail.html'
                    })
                    .state('app.authorityManage.updatePartTimeTeacher', {
                        url: '/updatePartTimeTeacher',
                        templateUrl: 'admin/authorityManage/updatePartTimeTeacher.html'
                    })
                    .state('app.authorityManage.addFullTimeTeacher', {
                        url: '/addFullTimeTeacher',
                        templateUrl: 'admin/authorityManage/addFullTimeTeacher.html'
                    })
                    .state('app.authorityManage.updateFullTimeTeacher', {
                        url: '/updateFullTimeTeacher',
                        templateUrl: 'admin/authorityManage/updateFullTimeTeacher.html'
                    })
                    .state('app.authorityManage.fullTimeTeacherDetail', {
                        url: '/fullTimeTeacherDetail/{fullTeacher}',
                        templateUrl: 'admin/authorityManage/fullTimeTeacherDetail.html'
                    })



                    //新增
                    .state('app.teachResearchManage.updateHeadSchool', {
                        url: '/updateHeadSchool/{headSchool}',
                        templateUrl: 'admin/teachResearchManage/updateHeadSchool.html',
                    })
                    .state('app.teachResearchManage.addSchoolBranch', {
                        url: '/addSchoolBranch',
                        templateUrl: 'admin/teachResearchManage/addSchoolBranch.html',
                    })
                    .state('app.teachResearchManage.updateSchoolBranch', {
                        url: '/updateSchoolBranch/{schoolBranch}',
                        templateUrl: 'admin/teachResearchManage/updateSchoolBranch.html',
                    })
                    .state('app.teachResearchManage.addCentreSchool', {
                        url: '/addCentreSchool',
                        templateUrl: 'admin/teachResearchManage/addCentreSchool.html',
                    })
                    .state('app.teachResearchManage.updateCentreSchool', {
                        url: '/updateCentreSchool/{centreSchool}',
                        templateUrl: 'admin/teachResearchManage/updateCentreSchool.html',
                    })



                    .state('app.authorityManage.studyGroup', {
                        url: '/studyGroup',
                        templateUrl: 'admin/authorityManage/studyGroup.html',
                    })
                    .state('app.authorityManage.addStudyGroup', {
                        url: '/addStudyGroup',
                        templateUrl: 'admin/authorityManage/addStudyGroup.html',
                    })
                    .state('app.authorityManage.updateStudyGroup', {
                        url: '/updateStudyGroup/{studyGroup}',
                        templateUrl: 'admin/authorityManage/updateStudyGroup.html',
                    })
                    .state('app.authorityManage.studyGroupDetail', {
                        url: '/studyGroupDetail/{studyGroup}',
                        templateUrl: 'admin/authorityManage/studyGroupDetail.html',
                    })
            }
        ]
    );
