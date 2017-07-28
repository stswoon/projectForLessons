function onDOMReady() {
    layout = new ColumnLayout();
    layout.init(widgets);

    // live events
    $(document).delegate('.dashboard-save', 'click', onClick_save);
    $('.dashboard').on('click', '.wActions .wClose', onClick_removeWidget);
    $('.dashboard').on('click', '.wActions .wMinimize', onClick_rollUpWidget);
    $(document).delegate('.dashboard-columns', 'change', onChange_dashboardColumnCount);
    $(window.dashboard).on('changeMode', toggleWidgetResizingMode);
}


function onDOMReady() {
    layout = new ColumnLayout();
    layout.init(widgets);

    // live events
    $(document).delegate('.dashboard-save', 'click', onClick_save);
    initDashboardEvents();

    $(document).delegate('.dashboard-columns', 'change', onChange_dashboardColumnCount);
    $(window.dashboard).on('changeMode', toggleWidgetResizingMode);

    initDashboardEvents();

    pushDashboardStateToHistory(dashboardId);
    window.onpopstate = function (event) {
        if (!event.state || !event.state.dashboardId) return;
        var targetDashboardId = event.state.dashboardId;
        $('.content').showLoading();
        setDashboard(targetDashboardId, function onResult() {
            var tab = $('.fast-nav-tab_' + targetDashboardId).get(0);
            if (tab) window.setActiveTab(tab);
            dashboardId = targetDashboardId;
            $('.content').hideLoading();
        });
    };
    $('.fast-nav-tab').click(onFastNavTabClick);
}

function initDashboardEvents() {
    var dashboard = $('.dashboard');
    dashboard.on('click', '.wActions .wClose', onClick_removeWidget);
    dashboard.on('click', '.wActions .wMinimize', onClick_rollUpWidget);
}