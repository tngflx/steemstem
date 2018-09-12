import { Template } from "meteor/templating";
import { Session } from "meteor/session";

FlowRouter.route('/', {
    name: 'home',
    action: function (params, queryParams) {
        BlazeLayout.render('mainlayout', { sidebar: "sidebar", main: "home", top: "topbanner", topmenu: "topmenu" });
        $('.actived').removeClass('actived')
        $('.steemstem.home').addClass('actived')
        Session.set('currentFilter', false)
        Session.set('currentSearch', false)
        Session.set('currentTag', false)
        Session.set('isonreply', false)
        // Content.getContentByBlog('steemstem',36,'steemstem',function (error) {
        //     if (error) {
        //         console.log(error)
        //     }
        // })
        Session.set('visiblecontent',18)
    }
});

FlowRouter.route('/admin', {
    name: 'admin',
    action: function (params, queryParams) {
        BlazeLayout.render('mainlayout', { sidebar: "sidebar", main: "admin", top: "topbanner", topmenu: "topmenu" });
    }
});

FlowRouter.route('/faq', {
    name: 'faq',
    action: function (params, queryParams) {
        BlazeLayout.render('mainlayout', { sidebar: "sidebar", main: "faq", top: "topbanner", topmenu: "topmenu" });
    }
});

FlowRouter.route('/aboutus', {
    name: 'aboutus',
    action: function (params, queryParams) {
        BlazeLayout.render('mainlayout', { sidebar: "sidebar", main: "aboutus", top: "topbanner", topmenu: "topmenu" });
    }
});

FlowRouter.route('/create', {
    name: 'create',
    action: function (params, queryParams) {
        BlazeLayout.render('mainlayout', { sidebar: "sidebar", main: "create", top: "topbanner", topmenu: "topmenu" });
    }
});


FlowRouter.route('/login', {
    name: 'login',
    action: function (params, queryParams) {
        localStorage.clear();
        localStorage.setItem('accesstoken', queryParams.access_token)
        localStorage.setItem('expireat', queryParams.expire_at)
        localStorage.setItem('username', queryParams.username)
        //console.log(queryParams.access_token)
        var time = new Date();
        FlowRouter.setQueryParams({ params: null, queryParams: null });
        time = new Date(time.getTime() + 1000 * (localStorage.expireat - 10000));
        localStorage.setItem('expirein', time)
        FlowRouter.go('/')
    }
});


FlowRouter.route('/@:user', {
    name: 'profile',
    action: function (params, queryParams) {
        BlazeLayout.render('mainlayout', { sidebar: "sidebar", main: "profile", top: "topbanner", topmenu: "topmenu" });
        Session.set('user', params.user)
        Session.set('currentprofiletab','blog')
        User.add(params.user, function (error) {
            if (error) {
                console.log(error)
            }
        })
        if(!PersonalHistory.findOne({author:params.user}))
        PersonalHistory.getPersonalHistory(params.user, function (error) {
            if (error) {
                console.log(error)
            }
        })
        $('.menu.profile .item').tab('change tab', 'first')
    }
});

FlowRouter.route('/@:user/comments', {
    name: 'profile',
    action: function (params, queryParams) {
        BlazeLayout.render('mainlayout', { sidebar: "sidebar", main: "profile", top: "topbanner", topmenu: "topmenu" });
        Session.set('user', params.user)
        Session.set('currentprofiletab','comments')
        User.add(params.user, function (error) {
            if (error) {
                console.log(error)
            }
        })
        if(!PersonalHistory.findOne({author:params.user}))
        PersonalHistory.getPersonalHistory(params.user, function (error) {
            if (error) {
                console.log(error)
            }
        })
        $('.menu.profile .item').tab('change tab', 'second')
    }
});

FlowRouter.route('/@:user/replies', {
    name: 'profile',
    action: function (params, queryParams) {
        BlazeLayout.render('mainlayout', { sidebar: "sidebar", main: "profile", top: "topbanner", topmenu: "topmenu" });
        Session.set('user', params.user)
        Session.set('currentprofiletab','replies')
        User.add(params.user, function (error) {
            if (error) {
                console.log(error)
            }
        })
        if(!PersonalHistory.findOne({author:params.user}))
        PersonalHistory.getPersonalHistory(params.user, function (error) {
            if (error) {
                console.log(error)
            }
        })
        $('.menu.profile .item').tab('change tab', 'third')
    }
});

FlowRouter.route('/@:user/rewards', {
    name: 'profile',
    action: function (params, queryParams) {
        BlazeLayout.render('mainlayout', { sidebar: "sidebar", main: "profile", top: "topbanner", topmenu: "topmenu" });
        Session.set('user', params.user)
        Session.set('currentprofiletab','rewards')
        User.add(params.user, function (error) {
            if (error) {
                console.log(error)
            }
        })
        if(!PersonalHistory.findOne({author:params.user}))
        PersonalHistory.getPersonalHistory(params.user, function (error) {
            if (error) {
                console.log(error)
            }
        })
        $('.menu.profile .item').tab('change tab', 'fourth')
    }
});

FlowRouter.route('/@:user/wallet', {
    name: 'profile',
    action: function (params, queryParams) {
        BlazeLayout.render('mainlayout', { sidebar: "sidebar", main: "profile", top: "topbanner", topmenu: "topmenu" });
        Session.set('user', params.user)
        Session.set('currentprofiletab','wallet')
        User.add(params.user, function (error) {
            if (error) {
                console.log(error)
            }
        })
        if(!PersonalHistory.findOne({author:params.user}))
        PersonalHistory.getPersonalHistory(params.user, function (error) {
            if (error) {
                console.log(error)
            }
        })
        $('.menu.profile .item').tab('change tab', 'fifth')
    }
});

FlowRouter.route('/:tag', {
    name: 'create',
    action: function (params, queryParams) {
        BlazeLayout.render('mainlayout', { sidebar: "sidebar", main: "home", top: "topbanner", topmenu: "topmenu" });
        Session.set('isonreply', false)
        Session.set('visiblecontent',18)
    }
});




FlowRouter.route('/@:user/:permlink', {
    name: 'project',
    action: function (params, queryParams) {
        BlazeLayout.render('mainlayout', { sidebar: "sidebar", main: "article", top: "topbanner", topmenu: "topmenu" });
        Session.set('isonreply', true)
        Session.set('user', params.user)
        Session.set('article', params.permlink)
        if (!Content.findOne({ permlink: params.permlink })) {
            Content.getContent(params.user, params.permlink, function (error) {
                if (error) {
                    console.log(error)
                }
            })
        }
        if (!Comments.findOne({ permlink: params.permlink })) {
            Comments.loadComments(params.user, params.permlink, function (error) {
                if (error) {
                    console.log(error)
                }
            })
        }
        User.add(params.user, function (error) {
            if (error) {
                console.log(error)
            }
        })
        Blog.getContentByBlog(params.user, 20, 'blog', function (error) {
            if (error) {
                console.log(error)
            }
        })
    }
})



//TO FIX PROBLEM WITH SEARCH 
FlowRouter.route('//@:user/:permlink', {
    name: 'project',
    action: function (params, queryParams) {
        BlazeLayout.render('mainlayout', { sidebar: "sidebar", main: "article", top: "topbanner", topmenu: "topmenu" });
        Session.set('isonreply', true)
        Session.set('user', params.user)
        Session.set('article', params.permlink)
        if (!Content.findOne({ permlink: params.permlink })) {
            Content.getContent(params.user, params.permlink, function (error) {
                if (error) {
                    console.log(error)
                }
            })
        }
        if (!Comments.findOne({ permlink: params.permlink })) {
            Comments.loadComments(params.user, params.permlink, function (error) {
                if (error) {
                    console.log(error)
                }
            })
        }
        User.add(params.user, function (error) {
            if (error) {
                console.log(error)
            }
        })
        PersonalHistory.getPersonalHistory(params.user, function (error) {
            if (error) {
                console.log(error)
            }
        })
        Blog.getContentByBlog(params.user, 20, 'blog', function (error) {
            if (error) {
                console.log(error)
            }
        })

        // Content.getContentByAuthor(params.user, "", function (error) {
        //     if (error) {
        //         console.log(error)
        //     }
        // })
    }
});

FlowRouter.route('/:tag/@:user/:permlink', {
    name: 'project',
    action: function (params, queryParams) {
        BlazeLayout.render('mainlayout', { sidebar: "sidebar", main: "article", top: "topbanner", topmenu: "topmenu" });
        FlowRouter.setQueryParams({ params: null, queryParams: null });
        FlowRouter.go('/')
        FlowRouter.go('/@' + params.user + '/' + params.permlink)
        Session.set('user', params.user)
        Session.set('article', params.permlink)
    }
});





