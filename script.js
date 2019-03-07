
const successMsg = 'Successfully published add-on, please allow up to 24 hours for it to become visible in the catalog'

const endpoint = 'https://api.strem.io'

function publishAddon(manifestUrl) {
  const http = new XMLHttpRequest()
  const apiUrl = endpoint + '/api/addonPublish'

  const data = JSON.stringify({ transportUrl: manifestUrl, transportName: 'http' })

  http.open('POST', apiUrl, true)

  http.setRequestHeader('Content-type', 'application/json')

  http.onreadystatechange = function() {
    if (http.readyState == XMLHttpRequest.DONE) {
      if (http.status == 200) {
        let response

        try {
          response = JSON.parse(http.responseText)
        } catch(e) {
          console.error(e)
          alert('API response is not valid JSON')
          return
        }

        if (response.error)
          alert(response.error.message || 'Unknown API response error')
        else
          confirm(response.result && response.result.success ? successMsg : 'Unknown API error')
      } else
        alert('Error ' + http.status + ': Could not get response from API, please try again later')
    }
  }

  http.send(data)
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#publishForm').addEventListener('submit', function(e) {
    e.preventDefault()
    publishAddon(document.getElementById('manifestUrl').value)
  })
})
