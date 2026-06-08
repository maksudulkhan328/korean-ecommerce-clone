import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/portal/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mail, Star, Send, FileText, Trash2, Search, Pencil } from 'lucide-react';

interface MailItem {
  id: string;
  from: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  starred: boolean;
}

const MailPage = () => {
  const { t } = useLanguage();
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [selectedMail, setSelectedMail] = useState<MailItem | null>(null);

  const mockMails: MailItem[] = [
    {
      id: '1',
      from: 'notifications@portal.com',
      subject: 'Welcome to Portal Mail',
      preview: 'Thank you for joining our service. Get started with...',
      time: '10:30 AM',
      unread: true,
      starred: false,
    },
    {
      id: '2',
      from: 'news@portal.com',
      subject: 'Daily News Digest',
      preview: 'Here are todays top stories from around the world...',
      time: 'Yesterday',
      unread: false,
      starred: true,
    },
    {
      id: '3',
      from: 'shopping@portal.com',
      subject: 'Your order has been shipped',
      preview: 'Great news! Your order #12345 is on its way...',
      time: '2 days ago',
      unread: false,
      starred: false,
    },
  ];

  const folders = [
    { id: 'inbox', label: t('inbox'), icon: Mail, count: 12 },
    { id: 'starred', label: t('starred'), icon: Star, count: 3 },
    { id: 'sent', label: t('sent'), icon: Send, count: 0 },
    { id: 'drafts', label: t('drafts'), icon: FileText, count: 2 },
    { id: 'trash', label: t('trash'), icon: Trash2, count: 5 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <Button className="w-full" size="lg">
              <Pencil className="mr-2 h-5 w-5" />
              {t('compose')}
            </Button>

            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-2">
                {folders.map((folder) => {
                  const Icon = folder.icon;
                  return (
                    <button
                      key={folder.id}
                      onClick={() => setActiveFolder(folder.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                        activeFolder === folder.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{folder.label}</span>
                      </div>
                      {folder.count > 0 && (
                        <Badge variant={activeFolder === folder.id ? 'secondary' : 'default'}>
                          {folder.count}
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Mail List */}
          <div className="lg:col-span-4 border-r border-border">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={`${t('search')} ${t('mail')}...`}
                  className="pl-10"
                />
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-1">
                {mockMails.map((mail) => (
                  <div
                    key={mail.id}
                    onClick={() => setSelectedMail(mail)}
                    className={`p-4 rounded-lg cursor-pointer transition-colors border ${
                      selectedMail?.id === mail.id
                        ? 'bg-muted border-primary'
                        : 'hover:bg-muted/50 border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${mail.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {mail.from}
                        </span>
                        {mail.starred && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                      </div>
                      <span className="text-xs text-muted-foreground">{mail.time}</span>
                    </div>
                    <h4 className={`font-medium mb-1 ${mail.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {mail.subject}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{mail.preview}</p>
                    {mail.unread && (
                      <Badge variant="default" className="mt-2 text-xs">
                        {t('unread')}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Mail Content */}
          <div className="lg:col-span-5">
            {selectedMail ? (
              <div className="h-full flex flex-col">
                <div className="border-b border-border pb-4 mb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{selectedMail.subject}</h2>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">{selectedMail.from}</span>
                        <span>•</span>
                        <span>{selectedMail.time}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Star className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <ScrollArea className="flex-1">
                  <div className="prose prose-sm max-w-none">
                    <p>{selectedMail.preview}</p>
                    <p className="mt-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="mt-4">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>
                </ScrollArea>

                <div className="mt-4 pt-4 border-t border-border flex gap-2">
                  <Button className="flex-1">Reply</Button>
                  <Button variant="outline">Forward</Button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Mail className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <p>Select a message to read</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailPage;
