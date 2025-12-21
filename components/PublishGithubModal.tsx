import React, {useState} from 'react';
import {createPortal} from 'react-dom';
import { useI18n } from '../services/i18n';

interface PublishGithubModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PublishGithubModal: React.FC<PublishGithubModalProps> = ({isOpen, onClose}) => {
    const { t } = useI18n();
    const [githubUrl, setGithubUrl] = useState('');
    const [branch, setBranch] = useState('main');
    const [isProcessing, setIsProcessing] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            // TODO: Add functionality for publishing from Github
            console.log('Publishing from Github:', { githubUrl, branch });

            // Placeholder - will be implemented later
            await new Promise(resolve => setTimeout(resolve, 1000));

            handleClose();
        } catch (err) {
            console.error("Failed to publish from Github", err);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleClose = () => {
        setGithubUrl('');
        setBranch('main');
        setIsProcessing(false);
        onClose();
    };

    // Render the modal in a portal so the overlay covers the entire viewport
    return createPortal(
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
            <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-2xl">
                <h2 className="mb-6 text-xl font-bold text-gray-900">
                    {t('githubModal.title')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4" aria-busy={isProcessing}>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">{t('githubModal.githubUrl')}</label>
                        <input
                            required
                            type="url"
                            value={githubUrl}
                            onChange={(e) => setGithubUrl(e.target.value)}
                            className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            placeholder="https://github.com/username/repository"
                            disabled={isProcessing}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">{t('githubModal.branch')}</label>
                        <input
                            required
                            type="text"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            disabled={isProcessing}
                            className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            placeholder="main"
                        />
                    </div>

                    <div className="flex justify-end pt-4 gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className={[
                                'relative px-4 py-2 font-medium rounded-full transition-all duration-200',
                                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                                'disabled:opacity-50 disabled:cursor-not-allowed',
                                'bg-white/80 text-slate-700 border border-white/60 backdrop-blur hover:bg-white focus:ring-sky-400'
                            ].join(' ')}
                            disabled={isProcessing}
                        >
                            {t('common.cancel')}
                        </button>
                        <button
                            type="submit"
                            disabled={isProcessing}
                            className={[
                                'relative px-4 py-2 font-medium rounded-full transition-all duration-200',
                                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                                'disabled:opacity-50 disabled:cursor-not-allowed',
                                'text-white bg-gradient-to-r from-fuchsia-500 to-sky-500 shadow-md hover:shadow-lg focus:ring-fuchsia-400'
                            ].join(' ')}
                        >
                            {isProcessing ? (
                                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                            strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('common.processing')}
                </span>
                            ) : (
                                t('githubModal.submit')
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default PublishGithubModal;
