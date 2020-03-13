function oauthSignIn() {
  const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  const redirect_uri = 'http://127.0.0.1:8080/';
  const response_type = 'token';
  const scope = 'https://www.googleapis.com/auth/calendar.events.readonly';
  const client_id = '176046280105-haoisb0rqk6bc7o9484lucgdg1l8pqv8.apps.googleusercontent.com';

  const form = document.createElement('form');
  form.setAttribute('method', 'GET');
  form.setAttribute('action', oauth2Endpoint);

  const params = {
    client_id,
    redirect_uri,
    response_type,
    scope,
    'include_granted_scopes': 'true',
    'state': 'google_cal_free_busy'
  };

  for (const p in params) {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}