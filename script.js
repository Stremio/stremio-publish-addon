
const successMsg = 'Successfully published add-on, please allow up to 24 hours for it to become visible in the catalog'

const endpoint = 'https://api.strem.io'

function publishAddon(manifestUrl) {

  const apiUrl = endpoint + '/api/addonPublish'

  const data = JSON.stringify({ transportUrl: manifestUrl, transportName: 'http' })

  fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data
  })
  .then(response => response.json())
  .then(response => {
      if (response.error)
        alert(response.error.message || 'Unknown API response error')
      else
        confirm(response.result && response.result.success ? successMsg : 'Unknown API error')
  })
  .catch(err => {
    console.error(err)
    alert((err || {}).message || 'Could not get response from API, please try again later')
  })
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#publishForm').addEventListener('submit', function(e) {
    e.preventDefault()
    publishAddon(document.getElementById('manifestUrl').value)
  })
})
