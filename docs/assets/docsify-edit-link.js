;(function(win) {
  win.EditOnGithubPlugin = {}

  function create(docBase, docEditBase, title) {
    title = title || 'Edit on github'
    docEditBase = docEditBase || docBase.replace(/\/blob\//, '/edit/')

    function editDoc(event, vm) {
      var docName = vm.route.file

      if (docName) {
        var editLink = docEditBase + docName
        window.open(editLink)
        event.preventDefault()
        return false
      } else {
        return true
      }
    }

    win.EditOnGithubPlugin.editDoc = editDoc

    return function(hook, vm) {
      win.EditOnGithubPlugin.onClick = function(event) {
        EditOnGithubPlugin.editDoc(event, vm)
      }

      var header = [
        '<a class="github-edit-btn" title="Edit on GitHub" href="',
        docBase,
        '" target="_blank" onclick="EditOnGithubPlugin.onClick(event)">',
        '<svg style="width:24px;height:24px" viewBox="0 0 24 24">',
        '  <path fill="#ffffff" d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29" />',
        '</svg>',
        '</a>'
      ].join('')

      hook.afterEach(function (html) {
        return header + html
      })
    }
  }

  win.EditOnGithubPlugin.create = create
}) (window)
