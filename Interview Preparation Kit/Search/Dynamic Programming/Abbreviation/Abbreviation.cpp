#include <iostream>
#include <climits>
#include <string>
#include <vector>
#include <cctype>
using namespace std;
int main()
{
    int T;
    cin >> T;
while(T)
{
    T--;
    string a, b;
    cin >> a >> b;
    int n = a.length(), m = b.length();
    if (n < m) {
        cout << "NO" << endl;
        continue;
    }
    vector<vector<bool>> f(n+1, vector<bool>(m+1));
    f[0][0] = true;
    for (int i = 1; i <= n && islower(a[i-1]); ++i)
        f[i][0] = true;
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= min(m, i); ++j) {
            if (islower(a[i-1]))
                f[i][j] = f[i][j] || f[i-1][j];
            if (toupper(a[i-1]) == b[j-1])
                f[i][j] = f[i][j] || f[i-1][j-1];
        }
    }
    if(f[n][m])
        cout << "YES" << endl;
    else
        cout << "NO" << endl;
}
    return 0;
}
