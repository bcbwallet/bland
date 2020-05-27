!macro customInstall
  WriteRegStr SHCTX "SOFTWARE\RegisteredApplications" "Bland" "Software\Clients\StartMenuInternet\Bland\Capabilities"

  WriteRegStr SHCTX "SOFTWARE\Classes\Bland" "" "Bland HTML Document"
  WriteRegStr SHCTX "SOFTWARE\Classes\Bland\Application" "AppUserModelId" "Bland"
  WriteRegStr SHCTX "SOFTWARE\Classes\Bland\Application" "ApplicationIcon" "$INSTDIR\Bland.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\Bland\Application" "ApplicationName" "Bland"
  WriteRegStr SHCTX "SOFTWARE\Classes\Bland\Application" "ApplicationCompany" "Bland"      
  WriteRegStr SHCTX "SOFTWARE\Classes\Bland\Application" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"      
  WriteRegStr SHCTX "SOFTWARE\Classes\Bland\DefaultIcon" "DefaultIcon" "$INSTDIR\Bland.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\Bland\shell\open\command" "" '"$INSTDIR\Bland.exe" "%1"'

  WriteRegStr SHCTX "SOFTWARE\Classes\.htm\OpenWithProgIds" "Bland" ""
  WriteRegStr SHCTX "SOFTWARE\Classes\.html\OpenWithProgIds" "Bland" ""

  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Bland" "" "Bland"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Bland\DefaultIcon" "" "$INSTDIR\Bland.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Bland\Capabilities" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Bland\Capabilities" "ApplicationName" "Bland"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Bland\Capabilities" "ApplicationIcon" "$INSTDIR\Bland.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Bland\Capabilities\FileAssociations" ".htm" "Bland"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Bland\Capabilities\FileAssociations" ".html" "Bland"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Bland\Capabilities\URLAssociations" "http" "Bland"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Bland\Capabilities\URLAssociations" "https" "Bland"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Bland\Capabilities\StartMenu" "StartMenuInternet" "Bland"
  
  WriteRegDWORD SHCTX "SOFTWARE\Clients\StartMenuInternet\Bland\InstallInfo" "IconsVisible" 1
  
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Bland\shell\open\command" "" "$INSTDIR\Bland.exe"
!macroend
!macro customUnInstall
  DeleteRegKey SHCTX "SOFTWARE\Classes\Bland"
  DeleteRegKey SHCTX "SOFTWARE\Clients\StartMenuInternet\Bland"
  DeleteRegValue SHCTX "SOFTWARE\RegisteredApplications" "Bland"
!macroend
