import { Alert } from '@mui/material';
import './EmailUnsubscribe.scss';

export default async function EmailUnsubscribe({ params }) {
  const { token } = await params;

  const data = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/users/email/unsubscribe/${token}`, {
    method: 'PUT',
  });

  const { statusCode, message } = await data.json();

  return (
    <div className="emailUnsibscribePage">
      <span className={`messagBox ${statusCode == 200 ? 'success' : ''}`}>{message}</span>
    </div>
  );
}
