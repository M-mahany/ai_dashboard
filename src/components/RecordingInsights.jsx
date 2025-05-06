import { useAnalyzeRecordingMutation, useApproveRecordingMutation } from '@/lib/services/recordingsApi';
import { isPermitted } from '@/utils/helpers/checkPermission';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { TbAnalyze } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const RecordingInsights = ({ recording, type = 'overall' }) => {
  const insightsKeywords = [
    'sentimentDistribution',
    'complaintRate',
    'complaints',
    'escalationSignalsRate',
    'topIssues',
    'escalationPhrases',
    'nuggetRatio',
    'overallSentiment',
    'quantifiedIssues',
  ];

  const user = useSelector((state) => state.auth.user);
  const feedbackKeywords = ['summary', 'recommendations'];

  const splitCamelCase = (text) => {
    return text.replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  const [analyzeRecording, { data: analyzeData, isLoading: isLoadingAnalyze, error: analyzeError }] =
    useAnalyzeRecordingMutation();

  const [approveRecording, { data: approvedData, isLoading: isLoadingApprove, error: approveError }] =
    useApproveRecordingMutation();

  const data = analyzeData || approvedData;
  const error = analyzeError || approveError;

  const handleReAnalyze = () => {
    analyzeRecording(recording?._id);
  };

  const handleApprove = () => {
    approveRecording(recording?._id);
  };

  useEffect(() => {
    let type = '';
    let message = '';
    if (data) {
      type = 'success';
      message = data?.message || 'Recording sent to AI queue successfully!';
    }
    if (error) {
      type = 'error';
      message = error?.data?.message || 'Error Sending Recording to queue';
    }
    if (error || data) {
      toast(message, { type });
    }
  }, [error, data]);

  return (
    <>
      {isPermitted(user, 'ANALYZE_RECORDING') && (
        <div className="bttnsWrapper">
          <Button className="reAnalyzeBttn" onClick={handleReAnalyze} disabled={isLoadingAnalyze}>
            <TbAnalyze className={`icon ${isLoadingAnalyze ? 'rotating' : ''}`} />
            {isLoadingAnalyze ? 'Sending to AI Queue...' : 'Retry AI Analysis'}
          </Button>
          {!recording?.isApproved && (
            <Button className="reAnalyzeBttn light" onClick={handleApprove} disabled={isLoadingApprove}>
              Approve
            </Button>
          )}
        </div>
      )}

      {Object.entries(recording?.insight)
        .filter(
          ([key, value]) =>
            (type === 'overall' ? insightsKeywords : feedbackKeywords).includes(key) &&
            (Array.isArray(value) ? value.length > 0 : value)
        )
        .map(([key, value]) => (
          <span className="tabContentInnerTxt" key={key}>
            <span className="heading">
              <p>{splitCamelCase(key)}:</p>
            </span>
            {Array.isArray(value) ? (
              <ol>
                {value.map((v, i) => (
                  <li key={i}>
                    <p>{v?.phrase || v || 'N/A'}</p>
                    {v?.count && (
                      <span className="infoTxt">
                        Mentioned{' '}
                        {v?.phrase
                          ? '(' + (v?.count || 1) + ')' + ` ${Number(v?.count ?? 1) > 1 ? 'Times' : 'Time'}`
                          : ''}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            ) : typeof value === 'object' ? (
              Object.entries(value).map(([key, value]) => (
                <p key={key} style={{ width: '100%' }}>
                  <span className={`boldTxt ${key}`}>{key}</span>: {value}
                </p>
              ))
            ) : (
              <p>
                {value}
                {key.includes('Rate') ? '%' : ''}
              </p>
            )}
          </span>
        ))}
    </>
  );
};

export default RecordingInsights;
